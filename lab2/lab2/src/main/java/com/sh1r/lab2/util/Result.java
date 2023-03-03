package com.sh1r.lab2.util;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Result {
    boolean byClick;
    LocalDateTime curTime;
    double x;
    double y;
    double r;
    String isHit;

    public Result(LocalDateTime curTime, double x, double y, double r, String isHit, boolean byClick) {
        this.byClick = byClick;
        this.curTime = curTime;
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
    }

    //-1.0-SNAPSHOT
    public String toHTML() {
        return "<tr>" +
                "<td>" + this.curTime.format(DateTimeFormatter.ofPattern("dd.MM.yy HH:mm:ss")) + "</td><td>" +
                String.format("%.3f", this.x) + "</td><td>" + String.format("%.3f", this.y) + "</td><td>" +
                String.format("%.3f", this.r) + "</td><td>" + this.isHit + "</td></tr>";
    }

    private boolean isByClick() {
        return this.byClick;
    }
}