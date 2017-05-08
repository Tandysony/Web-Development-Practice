# How to set up SSL for your domain

### 1. Purchase your ssl from an ssl provider. For example: [https://www.ssls.com/](https://www.ssls.com/)

### 2. Prepare your CSR (Certificate Signing Request)

1. Download and configure OpenSSL by adding the directory to environment variables from [here](https://slproweb.com/products/Win32OpenSSL.html). Download the `Win32 OpenSSL v1.x.xx Light` version.

2. Open command line as administrator, and change your directory to `C:\OpenSSL-Win32\bin` on a windows machine to generate CSR file.

3. Create a CSR (certificate signing request) and a private key files for your domain. `www.yourdomain.com` is your server domain use the following command. 
  
    ```
    openssl req -new -newkey rsa:2048 -nodes -keyout www.yourdomain.com.key -out www.yourdomain.com.csr
    ```

4. Fill out the form like the follwoing example, and your `www.yourdomain.com.key` and `www.yourdomain.com.csr` files will be generated under this directory.

    ```
    Country:                    CA
    State:                      Quebec
    Locality:                   Montreal
    Organization:               Your company name
    Division:                   Your division/department
    Common name:                www.yourdomain.com
    Email:                      admin@yourdomain.com
    A challege password:        YourPsw
    A optional company name:    CompanyName
    ```

5. Open the `.csr` file, copy the whole content and paste it to required `CSR` field to to sign/active the certificate file. You will see the certificate is now **In progress**.

6. Save the `aserialnumber.txt` file and put it on the server project root folder. This file must be accessable from your root domain: [www.yourdomain.com/aserialnumber.txt](www.yourdomain.com/aserialnumber.txt)

7. Once done, go to your purchase history, you should be able to see the status is now "Activated" with an expire date. Now go to the detailed page of this certificate to download the certificate archive. There are three files included: `www.yourdomain.com.ca-bundle`, `www.yourdomain.com.crt` and `www.yourdomain.com.p7b`.

8. Upload the private key file, `www.yourdomain.com.key` generated in step 4, and the cerfificate files to a folder of your website project directory, say, `xxx/yourproject/ssl`.

9. Configure the virtualhost settings to enable SSL on your server, Aparch 2.4 in this case.
    ```
    LoadModule ssl_module modules/mod_ssl.so

    Listen 443
    <VirtualHost ipaddress:443>
        SSLEngine on
        SSLCertificateFile /xxx/yourproject/ssl/www.yourdomain.com.crt
        SSLCertificateKeyFile /xxx/yourproject/ssl/www.yourdomain.com.key
        SSLCertificateChainFile /xxx/yourproject/ssl/www.yourdomain.com.ca-bundle
    </VirtualHost>
    ``` 
10. Go to [https://www.sslchecker.com/sslchecker](https://www.sslchecker.com/sslchecker) to make sure the SSL is working properly.

## Reference
1. Install Openssl on a windows machine - [https://www.tbs-certificates.co.uk/FAQ/en/openssl-windows.html](https://www.tbs-certificates.co.uk/FAQ/en/openssl-windows.html)

2. Creating a server certificate - [http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs_create.html#d0e16902](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_server-certs_create.html#d0e16902)

3. Apache 2.4 SSL settings - [https://httpd.apache.org/docs/2.4/ssl/](https://httpd.apache.org/docs/2.4/ssl/)

4. OpenSSL Error - 'Unable to load config info from `<path>` - [https://supportforums.cisco.com/document/116521/openssl-error-unable-load-config-info-error-req](https://supportforums.cisco.com/document/116521/openssl-error-unable-load-config-info-error-req)

5. Install ssl on amazon ec2 - [https://www.youtube.com/watch?v=_a4wRsT6LaI](https://www.youtube.com/watch?v=_a4wRsT6LaI)
