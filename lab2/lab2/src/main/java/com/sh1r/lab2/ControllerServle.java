package com.sh1r.lab2;


import com.sh1r.lab2.util.ResultsListBean;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import com.sh1r.lab2.util.Variables;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet(
        name = "ControllerServle",
        value = {"/control"}
)
public class ControllerServle extends HttpServlet {
    public ControllerServle() {
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.initContext();
        createBeanIfNull(request.getSession());
        response.setContentType("text/html;charset=utf-8");
        this.getServletContext().getNamedDispatcher("AreaCheckServlet").forward(request, response);
    }

    private void initContext() {
        if (this.getServletContext().getAttribute(Variables.TABLE_NAME) == null) {
            this.getServletContext().setAttribute(Variables.TABLE_NAME, "");
        }

        if (this.getServletContext().getAttribute(Variables.DOTS_NAME) == null) {
            this.getServletContext().setAttribute(Variables.DOTS_NAME, "");
        }
    }
    private void createBeanIfNull(HttpSession session) {
        if (session.getAttribute("results") != null) {
            return;
        }
        session.setAttribute("results", new ResultsListBean());
    }
}