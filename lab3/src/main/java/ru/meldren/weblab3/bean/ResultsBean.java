package ru.meldren.weblab3.bean;

import com.google.gson.GsonBuilder;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.validation.ValidationException;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import ru.meldren.weblab3.entity.Result;
import ru.meldren.weblab3.util.PlotUtil;

import java.io.Serializable;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.function.Consumer;


@Named //bean initialization
@SessionScoped //bean is initialized one time when person requests app and is saved in session
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResultsBean implements Serializable {

    final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("connection"); //allows to connect to DB
    final List<Result> results = new CopyOnWriteArrayList<>();
    Result current = new Result();

    public ResultsBean() {
        initTransaction(manager -> results.addAll(manager
                .createQuery("SELECT result FROM Result result", Result.class)
                .getResultList() // fills result list with results from DB
        ));

    }

    public void addResultFromPlot() {
        var params = FacesContext.getCurrentInstance()
                .getExternalContext().getRequestParameterMap();

        try {
            double x = Double.parseDouble(params.get("x")),
                y = Double.parseDouble(params.get("y"));

            if (x >= -3 && x <= 5 && y >= -5 && y <= 3) {
                current.setX(x);
                current.setY(y);
                addResult();
            } else throw new ValidationException();
        } catch (Exception ex) {
            FacesContext.getCurrentInstance().addMessage(null, new FacesMessage(
                    FacesMessage.SEVERITY_ERROR,
                    "Validation Error",
                    "Wrong parameters values."
            ));
        }
    }

    public void addResult() {
        current.setSuccessful(PlotUtil.isOnPlot(current.getX(), current.getY(), current.getR()));
        current.setTime(System.currentTimeMillis());
        results.add(current);
        initTransaction(manager -> manager.persist(current)); //adds results to DB
        current = current.clone();
    }


    public String parseResultsToJson() {
        return new GsonBuilder().create().toJson(results.stream()
                .peek(result -> result.setSuccessful(PlotUtil.isOnPlot(
                        result.getX(),
                        result.getY(),
                        current.getR()
                )))
                .toArray());
    }

    private void initTransaction(Consumer<EntityManager> transaction) { //
        EntityManager manager = entityManagerFactory.createEntityManager();
        try {
            manager.getTransaction().begin();
            transaction.accept(manager);
            manager.getTransaction().commit();
        } catch (Exception ex) {
            if (manager.getTransaction().isActive()) {
                manager.getTransaction().rollback();
            }
            System.out.println("An exception occurred during transaction.");
            ex.printStackTrace();
        } finally {
            manager.close();
        }
    }
}
