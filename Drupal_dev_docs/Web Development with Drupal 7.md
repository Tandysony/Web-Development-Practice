# Web Development with Drupal 7

* Author: Suo Tan (tandysony AT gmail DOT com)
* Created: Dec. 3, 2015
* Last updated: Jan. 13, 2015

---

## Prerequisite
1. AMPPS installed
2. Drupal 7 installed

## Website Development with Drupal
In this demo, website folder is named `loc.jidps.com`.

### 1. Drupal 7 blocks and region structure
 * A webpage structure in Drupal 7 is shown in the following figure

   ![Drup  7 blocks and region structure](img/block-regions-highlighted.gif)

### 2. Themes
 * Download [themes](https://www.drupal.org/project/project_theme)

   ![Drupal 7 theme anatomy](img/drupal_7_theme_anatomy.png)

### 3. Modules
 * Unzip your theme and modules, and put them under the respective folder (`themes` or `modules`) under the `loc.jidps.com/sites/all` folder.
 * Some must have modules for Drupal 7:

    * [Pathauto](https://www.drupal.org/node/17345)
    * [Token](https://www.drupal.org/project/token)
    * [CTools](https://www.drupal.org/project/ctools)
    * [Views](https://www.drupal.org/project/views)
    * [CKEditor](https://www.drupal.org/project/ckeditor)
    * [Module Filter](https://www.drupal.org/project/module_filter)
    * [Media](https://www.drupal.org/project/media)
    * [Administration menu](https://www.drupal.org/project/admin_menu)
    * [Entity API](https://www.drupal.org/project/entity)
    * [Backup and Migrate](https://www.drupal.org/project/backup_migrate)

### 4. Views
 * Understand the core concept `View` in Drupal: [View - Formats & Pagers](https://www.youtube.com/watch?v=uDWs0ij6Dt0&index=25&list=PL15BE2E8313A4E809)

### 5. Taxonomy
 * xxx
 * To configure multi-layer taxonomy pattern, go to `Configuration` --> `Search and metadata` --> `URL aliases` --> `TAXONOMY TERM PATHS`: under `Default path pattern`, fill in `[term:vocabulary]/[term:parents:join-path]/[term:name]`

## On Use
 * set and configure **roles**: `People` --> `Permissions` --> `Roles`
 * set and configure **categories**: `Structure` --> `Taxonomy`
 * set and configure **status**: `Configuration` --> `Workbench` --> `States`
 * configure **transations**: `Configuration` --> `Workbench` --> `Transations`

## Some thoughts
#### 1. Use `custom menu` for role selection
#### 2. Use [Workbench Suite](https://www.drupal.org/documentation/modules/workbench) for JIDPS website development. Here is an [introduction tutorial](https://modulesunraveled.com/workbench)
#### 3. Using `rules` and `Workbench_moderation`
 * **Event**: `After saving new content` (also tried `after moderation transition`)
 * **Conditons**: `Content is using workbench moderation` and `contents current moderation state`.
 * **Actions**: send mail `node:author:mail` (that the new content has been moderated and published)
 * **Data Viz**: visualize data.

## Frequent Q/As

#### 1. Having `?q=` in URLs even with `Pathauto` module enabled?
 * You need to make sure `LoadModule rewrite_module modules/mod_rewrite.so` in the `httpd.conf` file is uncomment out, no leading `#`.

    ![enable rewrite module](img/Apache_modules.PNG)

* Go to `http://localhost/loc.jidps.com/?q=admin/config/search/clean-urls` and check `Enable clean URLs`

#### 2. `CKEditor V4.5.X` could not be detected by `wysiwyg v7.x-2.2` module?
  * Open `\sites\all\libraries\ckeditor\ckeditor.js` file in a text editor.
  * Add `// version:'4.4.3',revision:'4391'` in first line and save it.

#### 3. Sync a localhost website to multiple machines?

> **Do NOT fully rely on the `Backup and Migrate` module to sync your entire website among multiple machines. Too shame that Drupal released the `Backup and Migrate module (7.x-3.1)` that is not functional well at the time of writing (Jan. 12, 2016), even with patches applied. It raised all kinds of issues all over the Internet. Hereby, I provide a way to baypass the restore function. I have tested this on two PCs running Windows 7 64-bit and one Macbook Pro running OS X El Capitan. It works like a charm.**

 > **Please also be noted that the sync process is based on the `AMPPS` software, to ensure that database version and structure (i.e., table prefix) are exactly the same across all computers, no matter running MAC OS, Windows or Linux.**

  * **3.1.** Backup your database and website

  * The `Back and Migrate` module does not work with `Entire Site (code, files & DB)` restore option. Here is my solution:
    1. Use the `Back and Migrate` module to `Download` the `Defualt Database` (NOT `Entire Site (code, files & DB)`).

        ![backup and migrate](img/backup_migrate.png)

    2. Copy the database backup file (e.g., `xxx.mysql.gz`) and your entire drupal website folder (all files under the `..\Ampps\www` directory) to your USB drive or a cloud drive (e.g., Google Drive, Dropbox).
    3. Visit your `phpMyAdmin` page on a different computer, choose your current database (`drup599` in this case) being used for Drupal website development, and `Import` from your database backup file (`xxx.mysql.gz`). Then paste you whole website into you new local `www` folder.

        ![database restore](img/database_restore.png)

    4. Open the `settings.php` file under the directory `www\sites\default\`. Be sure that `databse ==> xxx` has the same name of current local database (`drup599` in this case). Change the values to `username` and `password` to `root` and `mysql` respectively.
        ```php
        $databases = array (
        'default' =>
          array (
            'default' =>
            array (
              'database' => 'drup599',
              'username' => 'root',
              'password' => 'mysql',
              'host' => 'localhost',
              'port' => '',
              'driver' => 'mysql',
              'prefix' => 'dr_',
            ),
          ),
        );
        ```

    5. Then visit your website and click `Flush all cashes` from the top tool bar. You are now synced your website between two machines.
