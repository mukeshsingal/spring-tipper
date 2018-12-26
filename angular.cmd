DEL src\main\webapp\favicon.ico
DEL src\main\webapp\*.js
DEL src\main\webapp\*.css
DEL src\main\webapp\WEB-INF\geeksforgeeks\dist\* /Q /S

cd src\main\webapp\WEB-INF\geeksforgeeks\
CALL ng build --prod
cd ..\..\..\..\..\
copy src\main\webapp\WEB-INF\geeksforgeeks\dist\geeksforgeeks\*.js src\main\webapp\
copy src\main\webapp\WEB-INF\geeksforgeeks\dist\geeksforgeeks\*.css src\main\webapp\
copy src\main\webapp\WEB-INF\geeksforgeeks\dist\geeksforgeeks\*.ico src\main\webapp\
copy src\main\webapp\WEB-INF\geeksforgeeks\dist\geeksforgeeks\*.txt src\main\webapp\
copy src\main\webapp\WEB-INF\geeksforgeeks\dist\geeksforgeeks\*.txt src\main\webapp\
cd src\main\webapp\WEB-INF\geeksforgeeks\dist\geeksforgeeks
rename index.html index.jsp


