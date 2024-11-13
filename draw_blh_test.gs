'reinit'
*'open blh_AMJ.ctl'                ;* Open the data file
'open blh_2019-21.ctl'                ;* Open the data file
'set gxout shaded'            ;* Set the output to shaded contours
'set lon 115 122'            ;* Set longitude range (adjust as needed)
'set lat 22 29'              ;* Set latitude range (adjust as needed)
it=1
while it<=72
'set grads off'
'set xlint 1'
'set ylint 1'


'set t 'it''                     ;* Set the time step to the first time (adjust as needed)

'set xlopts 1 1.5 0.2' ;* 设置X轴标记数字的颜色、粗细和大小（英寸）
'set ylopts 1 1.5 0.2' ;*设置Y轴标记数字的颜色、粗细和大小（英寸）
'set mpdset hires'
'set mpdraw fuj'

'set rgb 16 34 139 34'       ;* Dark Green
'set rgb 17 0 128 0'         ;* Green
'set rgb 18 127 255 0'       ;* Chartreuse
'set rgb 19 173 255 47'      ;* Yellow Green
'set rgb 20 255 255 0'       ;* Yellow
'set rgb 21 255 215 0'       ;* Gold
'set rgb 22 255 165 0'       ;* Orange
'set rgb 23 255 69 0'        ;* Red Orange
'set rgb 24 255 0 0'         ;* Red
'set rgb 25 178 34 34'       ;* Firebrick
'set rgb 26 139 0 0'         ;* Dark Red
'set rgb 27 128 0 0'         ;* Maroon
'set rgb 28 105 105 105'     ;* Dim Gray
'set rgb 29 169 169 169'     ;* Dark Gray
'set rgb 30 192 192 192'     ;* Silver
'set rgb 31 211 211 211'     ;* Light Gray
'set rgb 32 220 220 220'     ;* Gainsboro
'set rgb 33 245 245 245'     ;* White Smoke


'set clevs 100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 '
'set ccols 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 '

'd blh'                       ;* Draw the variable with shaded contours
'q time'
x=sublin(result,1)
say x
y=subwrd(x,3)
say y
year=substr(y,9,4)
say year
month=substr(y,6,3)
say month
lt=math_mod(it+8,24)
jt=math_mod(it+8,24)+100
kt=math_int((it-0.3)/24)
say it' 'jt' 'kt

;'draw title Boundary Layer Height time 'lt' '  ;* Add a title
'run cbarn.gs'                ;* Add a color bar
'draw shp CHN_pronvices' ;* Overlay the boundary of Fujian province

'gxprint 2019-2021_diurnal_'kt'_'jt'.png white'
*'gxprint blh_AMJ_diurnal_'kt'_'jt'.png white'
'c'
exit
it=it+1
endwhile
;
