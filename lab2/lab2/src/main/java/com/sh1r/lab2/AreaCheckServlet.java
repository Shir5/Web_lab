package com.sh1r.lab2;

import com.google.gson.Gson;
import com.sh1r.lab2.util.Data;
import com.sh1r.lab2.util.Result;
import com.sh1r.lab2.util.Variables;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Reader;
import java.time.LocalDateTime;
import java.util.*;

import static java.util.Arrays.asList;
import static java.util.Arrays.copyOf;
import static java.util.stream.Collectors.*;

@WebServlet(name = "AreaCheckServlet", value = "/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println(request.getQueryString());
        System.out.println(request.getAttribute("x"));
        Data data = getData(request);
        System.out.println(data);

        if (data == null) {
            response.getWriter().println(this.getServletContext().getAttribute(Variables.TABLE_NAME));
        } else {
            if (this.validateData(data)) {
                Result result = new Result(LocalDateTime.now(), data.getX(), data.getY(), data.getR(), this.isHit(data.getX(), data.getY(), data.getR()) ? "Попадание" : "Промах", data.isClick());
                this.getServletContext().setAttribute(Variables.TABLE_NAME, this.getServletContext().getAttribute(Variables.TABLE_NAME) + result.toHTML());
                response.getWriter().println(this.getServletContext().getAttribute(Variables.TABLE_NAME));
            }
        }


    }
    private Data getData(HttpServletRequest req) {
        Map<String, String> queryMap = new HashMap<>();
        try{
        Arrays.stream(req.getQueryString().split("&")).forEach(el -> {
            String[] els = el.split("=");
            if (els.length != 2) return;
            queryMap.put(els[0], els[1]);
        });}catch (Exception exception){
            return null;
        }
        System.out.println(queryMap);
        Data data = new Data();
        if (queryMap.get("x") != null) {
            System.out.println(queryMap.get("x"));
            data.setX(Double.parseDouble(queryMap.get("x")));
        } else {
            return null;
        }
        if (queryMap.get("y") != null) {
            data.setY(Double.parseDouble(queryMap.get("y")));
        } else {
            return null;
        }
        if (queryMap.get("r") != null) {
            data.setR(Double.parseDouble(queryMap.get("r")));
        } else {
            return null;
        }
        if (queryMap.get("click") != null) {
            data.setClick(Boolean.parseBoolean(queryMap.get("click")));
        } else {
            return null;
        }
        System.out.println(data);
        return data;
    }
    private boolean checkX(double x) {
        return true;
    }

    private boolean checkY(double y) {
        return y > Variables.MIN_Y && y < Variables.MAX_Y;
    }

    private boolean checkR(double r) {
        return Variables.R_VALUES.contains(r);
    }

    private boolean validateData(Data sentData) {
        if (sentData == null) {
            return false;
        } else {
            return this.checkX(sentData.getX()) && this.checkY(sentData.getY()) && this.checkR(sentData.getR()) || sentData.isClick();
        }
    }
    boolean isHit(double x, double y, double r) {
        return this.checkCircle(x, y, r) || this.checkLinear(x, y, r) || this.checkSquare(x, y, r);
    }
    boolean checkLinear(double x, double y, double r) {
        return x >= 0.0 && y <= 0.0 && y >= x / 2.0 - r / 2.0;
    }

    boolean checkCircle(double x, double y, double r) {
        return x <= 0.0 && y <= 0.0 && x * x + y * y <= (r * r) / 4.0;
    }

    boolean checkSquare(double x, double y, double r) {
        return x >= 0.0 && y >= 0.0 && x <= r && y <= r;
    }
}
