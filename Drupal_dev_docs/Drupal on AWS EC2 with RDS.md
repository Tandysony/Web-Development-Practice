# Install Drupal on AWS EC2 with RDS

* Author: Suo Tan (tandysony AT gmail DOT com)
* Created: April 6, 2016
* Last updated: April 7, 2016

---

## 1. Initialize an EC2 instance and a MySQL Database instance on AWS. Please make sure that the two instance is using the *same privacy group* as the EC2 instance

## 2. [Install LAMP on AWS EC2]
#### [Install LAMP on AWS EC2](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/install-LAMP.html). You can check the [video tutorial series here](https://www.youtube.com/watch?v=FEnLnjnBw9I). Everything in this tutorial series is correct except the `Drush` installation.

## 3. Install Drush (Installing `drush` via `pear` in the video tutorial is NOT supported anymore)
#### 3.1 Download latest stable release using the code below or browse to github.com/drush-ops/drush/releases.
>    `wget http://files.drush.org/drush.phar`

**NOTE**: `.phar` refers to `PHP Archive`.

#### 3.2 Test your install.
>    `php drush.phar core-status`

#### 3.3 Rename to `drush` instead of `php drush.phar`. Destination can be anywhere on `$PATH`.
>    `chmod +x drush.phar`
>    `sudo mv drush.phar /usr/local/bin/drush`

#### 3.4 Optional. Enrich the bash startup file with completion and aliases.
>    `drush init`

## 4. Install Drupal
#### 4.1 Download Drupal using drush
>    `drush dl drupal-7.43`

#### or Install drupal without drush
    `wget http://ftp.drupal.org/files/projects/drupal-x.x.tar.gz`
    `tar -xzvf drupal-x.x.tar.gz`

#### 4.2 Move Drupal to your own website folder (jidps, in this case)
>    `mv drupal-7.43/ jidps`

#### 4.3  Config the httpd.conf file, and change the `/DocumentRoot` path to your own website directory (`/var/www/html/jidps` in my case)
>    `sudo nano /etc/httpd/conf/httpd.conf`

#### 4.5  Open a browser and go to the public IP of your EC2 instance, to install Drupal, as shown in the video tutorial. Be sure the `host` and `database name` and `password` should be that of your RDS database instance.

#### 4.6 Make a copy of the `default.settings.php` file under `/site/default`, and name it to `settings.php`
>    `cp default.settings.php settings.php`

#### 4.7 You are ready to go.

## 5. Using FileZilla to upload local website
#### 5.1 Load the .ppk/.pem file, and use your EC2 instance[Check the video tutorial here](https://www.youtube.com/watch?v=e9BDvg42-JI)
  > `Host:` sftp://XXX-XX-XX-XX.us-west-2.compute.amazonaws.com

  > `Username:` ec2-user

#### 5.2 Upload all your local website to the website directory on AWS (`/var/www/html/jidps/`, in my case)

## 6. Import your backup databse to RDS instance [critical to syn your website]
#### 6.1 Use phpMyAdmin to export your website database as a `*.sql` file.

#### 6.2 Use FileZilla to upload the backup file to a directory (`/var/www/html/jidps/***/backup`, for example) on AWS server.

#### 6.3 Go to the backup folder
>  `cd /var/www/html/jidps/***/backup`

#### 6.4 Stop mysql of the AWS instance
>  `sudo service mysqld stop`

#### 6.4 Stop mysql of the AWS instance
>  `sudo service mysqld stop`

### [You may skip the following steps (6.5-6.8), since AWS hosted Drupal database alway threw `duplicate primary key errors`, if import backup database to the RDS database directly.]

#### 6.5 Connect to your Amazon RDS DB instance as a remote host
>    `mysql -h xxxxxxxx.xxxxxxxxxxx.us-west-2.rds.amazonaws.com -P 3306 -u root -p`

#### 6.6 Drop the used database
> `mysql> DROP [dbname];`

#### 6.7 Create a database with the same one dropped
> `mysql> CREATE [dbname];`

#### 6.8 Exit the RDS instance
> `mysql> exit;`

#### 6.9 Import backup database to RDS
>  `mysql -h xxxxxxxx.xxxxxxxxxxx.us-west-2.rds.amazonaws.com -P 3306 -u root -p drup532 < drup532.sql`

## 7. Some Commands to Manipulate an Amazon RDS DB instance
#### 7.1 Connect to your Amazon RDS DB instance as a remote host
>    `mysql -h xxxxxxxx.xxxxxxxxxxx.us-west-2.rds.amazonaws.com -P 3306 -u root -p`

#### 7.2 Run MySQL command line for operations
  * List all the databases in the instance
  > `mysql> SHOW DATABASES;`

  * Select a database
  > `mysql> USE [dbname];`

  * Show all tables within the selected database
  > `mysql> SHOW TABLES;`

  * Drop a database
  > `mysql> DROP [dbname];`

  * Create a database
  > `mysql> CREATE [dbname];`

  * Exit the RDS instance
  > `mysql> exit;`

## 8. Some common Linux Commands
#### 8.1 Change permission:
    `chmod 775 -R [directory]`

#### 8.2 Check permission for all the files and directories:
    `ls -ld`

#### 8.3 Remove a file:
    `rm [fileName]`

#### 8.4 Romve a directory:
    `rm -r [directory]`

#### 8.5 change name of a folder:
    `mv [folderName_A] [folderName_B]`

#### 8.6 Install and uninstall phpmyadmin on AWS:
    `sudo yum --enablerepo=epel install phpmyadmin`
    `yum erase phpmyadmin`

#### 8.7 Searching with `nano` command: `Ctrl` + `W` is the shortcut for searching. To repeat the search: `Alt` + `W`

#### 8.8 Configure phpMyAdmin
    `sudo nano /etc/phpMyAdmin/config.inc.php`
