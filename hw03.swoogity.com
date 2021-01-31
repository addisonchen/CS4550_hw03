server {
	listen 80;
	listen [::]:80;
	
	root /home/aj/www/hw03.swoogity.com/build;
	index index.html;
	server_name hw03.swoogity.com;

	location / {
		try_files $uri $uri/ =404;
	}
}
