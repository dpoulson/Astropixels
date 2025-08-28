# Overview

The Astropixels are standard ws2812 RGB LEDs, running off an ESP32 controller. 

They use a library created by another builder called the ReelTwo library. This combines the code for a number of different systems supplied by the club over the years and is a great base for new ones.

## Hardware

### Standard pins

<table>
    <thead>
        <tr>
            <th>Board</th>
            <th>Default Pin</th>
        </tr>
    </thead>
    <tbody>
        <tr><td>RLD</td><td>33</td></tr>
        <tr><td>FLD</td><td>15</td></tr>
        <tr><td>FPSI</td><td>32</td></tr>
        <tr><td>RPSI</td><td>23</td></tr>
        <tr><td>THP</td><td>27</td></tr>
        <tr><td>RHP</td><td>26</td></tr>
        <tr><td>FHP</td><td>25</td></tr>
        <tr><td>AUX1</td><td>2</td></tr>
        <tr><td>AUX2</td><td>4</td></tr>
        <tr><td>AUX3</td><td>5</td></tr>
        <tr><td>AUX4</td><td>18</td></tr>
        <tr><td>AUX5</td><td>19</td></tr>
    </tbody>
</table>

### ESP32

I use a standard, off the shelf ESP32 dev board (30 pin version). These can be bought from anywhere (ebay, amazon, aliexpress) if you do break yours. Then you can simply flash the correct firmware back on it. I generally have a couple of spares on me, just in case. The USB ports can be fragile and easily knocked off whilst working in the dome.
