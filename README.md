![image](https://github.com/amirzgh/se-lab-6/assets/59364450/4c2b6453-f7fc-406c-b2a2-1f6800b56ea4)# استقرار یک نرم افزار مبتنی بر MicroService به کمک Docker

#### آزمایش ششم درس آز مهندسی نرم افزار 
---
### گزارش آزمایش:
در ابتدا برنامه مورد نظر را با استفاده از node , express می نویسیم از آن جایی که قرار است به صورت میکروسرویس برنامه را پیاده سازی کنیم بک اند که با استفاده از Express پیاده سازی و دیتابیس که با استفاده از Postgres نوشته شده را به صورت کاملا مجزا ساخته و جلو می بریم و برای هر یک یک فایل داکری جدا می نوسیم سپس با استفاده از Docker composer به یک دیگر متصل خواهیم کرد و از Ngnix برای لود بالانس استفاده می کنیم - نمودار استقرار به صورت زیر خواهد بود 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/18f42bfe-4d8d-43a9-aadb-de1a8081aa36)

به صورت زیر برنامه را می نویسیم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/b46135ee-a8d2-469c-9a45-58c17c2544c0)
سپس برای آن فایل داکری می نویسیم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/5cde06b2-65c0-483f-aef5-36e23e86fff2)
که به ترتیب به توضیح هر خط می پردازیم : 
- خط 2: ورژن node مورد نظر را وارد می کنیم
- خط 5: نیاز است مشخش کنیم working directory کجا باشد
- خط 8: فایل package*.json را کپی می کنیم
- خط 11: کتابخانه هایی که در package*.json وجود دارد را دانلود و نصب می کنیم
- خط 14: بقیه فایل های موجود را کپی و منتقل می کنیم
- خط 17: پورت برنامه را مشخص می کنیم
- خط 20: با استفاده از دستور npm start برنامه را ران می کنیم

  پس از آن می توان با استفاده از دستور
   `  docker build -t [name] .  `
  می توان به صورت جداگانه داکر فایل را بیلد و فایل image ساخت ( لازم به ذکر است چون جلو تر از Docker-composer استفاده می کنیم نیازی به این کار نیست )
  

![Screenshot 2023-08-25 123312](https://github.com/amirzgh/se-lab-6/assets/59364450/7e10f639-d3fe-45d0-a164-82d41466d43f)

---
حال به سراغ میکروسرویس بعدی یعنی دیتابیس می رویم 
بهتر است از قبل بر روی سیستم خود postgres را نصب داشته باشم 
سپس در پوشه مجزایی که برای آن ساخته ایم داکر فایل آن را به صورت زیر تنظیم می کنیم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/ccd54036-d081-42d3-a3a0-d110579a1825)

که به ترتیب به توضیح هر خط می پردازیم : 
- خط 2: ورژن postgres را مشخص می کنیم و مشخص می کنیم که داکر فایل مربوط به postgres می باشد
- خط 5 و 6 و 7: مربوط به تنظیمات دیتابیس مورد نظر می باشد که آن را برای اتصال داخل برنامه نیاز داریم

  ---
  در صورتی که هر داکر فایل را بیلد کنیم و کانترنر بسازیم با زدن دستور های 
  ```
  docker ps
  docker image ls
  ```
نتیجه زیر حاصل می شود نتیجه ( نتیجه docker ps شامل کانتینر ها و نتیجه docker image ls  شامل image های ساخته شده می باشد)

![Screenshot 2023-08-25 130605](https://github.com/amirzgh/se-lab-6/assets/59364450/431cd892-4436-48e5-8c81-72a91eba7c6d)


لازم به ذکر است می توان همه این موارد را داخل نرم افزار داکر نیز مشاهده نمود 

![Screenshot 2023-08-25 125901](https://github.com/amirzgh/se-lab-6/assets/59364450/3b8be235-aeb6-43d1-9e6d-5ebc2f951d53)

---
پس از آن نیاز داریم برای راحتی کار از docker-composer استفاده کنیم که خود مسایل مربوط به network و متصل کردن image ها و کانتینر ها را انجام دهد 
برای این کار داخل پوشه پدر که میکروسرویس ها در آن قرار دارند یک فایل با نام docker-compose.yml می سازیم و داخل آن باید ادرس داکر فایل ها را قرار دهیم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/0b653cc2-01a3-46b2-a447-1c36f2b15a60)

که به ترتیب به توضیح هر خط می پردازیم : 
- خط 1: در این خط ورژن کامپوسر را مشخص می کنیم 
- خط 2: شروع به تعریف سرویس ها می کنیم
- خط 3: اسم سرویس
- خط 4: ادرس محل داکر فایل
- خط 5: پورت ها را مشخص می کنیم و پورت داکر را به پورت سیستم نیز آساین می کنیم
- خط 7: در این جا می گویم این سرویس نیازمند به سرویس دیگر می باشد و اول باید سرویس دیگر اجرا شود
- خط 10 تا اخر : مانند توضیحات قبل می باشد با این تفاوت که در قسمت environment با توجه به این که چه چیزی را داریم داکری می کنیم نیاز داریم کانفیگ های مورد نیاز را بدیم در این جا اسم و یوزرنیم و پسورد دیتابیس می باشد  

سپس با کمک دستور 
```
docker-compose up --build 
```
داکر کامپوسر را بیلد و بالا می آوریم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/28677a27-2957-4949-a5f5-4ed5bfcb92d2)

حال می توان روی پورتی که مشخص کرده ایم ریکوست مورد نظر را بزنیم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/3ffec626-f78d-43ac-b1da-4c57872f0f61)

---

حال می خواهیم با کمک Nginx  قابلیت load balancing را به برنامه نیاز کنیم برای این کار نیاز داریم یک سرویس دیگر به وجود بیاوریم و داخل آن داکر فایل و کانفیگ های مربوطه را قرار دهیم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/e80e1fee-cdb1-4bbd-a300-b89bc24ca9d5)

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/229c139f-66f1-4ed7-bf6e-97b7610cd622)

داخل فایل کانفیگ:
 - دستور worker_processes: این دستور تعداد فرآیندهای ورکر هایی را که NGINX باید استفاده کند را مشخص می کند.
 - دستور worker_connections: حداکثر اتصال ورکر ها را مشخص می کند 
 - قسمت http: در این قسمت کانفیگ های مربوط به درخواست http مطرح می شود 
 - قسمت server: در این قسمت کانفیگ های مربوط به قسمت بک اند http را مطرح می شود 
 - دستور listen: که در آن پورت مشخص می شود 
 - دستور location: محل درخواست 
در ادامه دستور هایی مربوط به هدر درخواست ها و ای پی درخواست دهنده و... وارد می شود 

پس از آن نیاز است که این فایل را مانند موارد مشابه وارد فایل کامپوسر کنیم و مجددا آن را بیلد بگیریم 

![image](https://github.com/amirzgh/se-lab-6/assets/59364450/0e03899a-c008-48a7-b44e-30fd4433f2b7)

سپس اگر دستور مربوط به مشاهده image ها را بزنیم می بیننیم image های مربوطه ساخته شده است ( لازم به ذکر است که یکی از روش هایی که پیشنهاد شده بود این بود که پروژه بر روی دو پورت 4001 و 4002 بالا بیاید برای همین دارای دو image می باشد ) 

![Screenshot 2023-08-25 163211](https://github.com/amirzgh/se-lab-6/assets/59364450/b557fa9e-4592-46de-a323-fc1c27470961)



---
## پرسش ها:

  پرسش اول:
    
   باتوجه به نیاز ارایه شده می توان از مدل های مختلفی از uml استفاده نمود برای مثال Use Case Diagram یا Sequence Diagram یا Class Diagram یا Component Diagram حتی از نمودار deployment diagram که در این جا آن را ارایه کردیم که به این صورت است که کلاینک درخواست را به نود docker می فرستم و در ان جا وارد کانتینر Ngnix می شود و لود بالانس صورت گرفته و به یکی از کانتینر های اپلیکیشن فرستاده می شود و در آن جا به یک دیتابیس واحد متصل هستند و نیاز کاربر را انجام می دهند 

   ![image](https://github.com/amirzgh/se-lab-6/assets/59364450/31bc722b-8389-4fec-bf8e-f67c6f26e29d)


   پرسش دوم:
   
  معماری DDD یک روش برای طراحی و توسعه نرم‌افزار است که بر تمرکز بر دامنه مسئله تأکید دارد.
  معماری میکروسرویس یک رویکرد برای ساخت نرم‌افزار است که در آن نرم‌افزار به صورت مجموعه‌ای از سرویس‌های کوچک و مستقل تقسیم می‌شود، که به نام میکروسرویس‌ها شناخته می‌شوند.
  مانی که از DDD در طراحی میکروسرویس‌ها استفاده می‌شود، میکروسرویس‌ها می‌توانند به عنوان سرویس‌های دامنه طراحی و پیاده‌سازی شوند. هر میکروسرویس می‌تواند یک دامنه مسئله خاص را پوشش دهد و مفاهیم مرتبط با آن دامنه را بازتاب دهد. این باعث می‌شود که میکروسرویس‌ها بر اساس تجزیه و تحلیل دقیق دامنه‌های مسئله طراحی شوند و تغییرات در منطق کسب‌وکار راحت‌تر مدیریت شوند.

  پرسش سوم:
    
  درابتدا توضحی درباره ابزارهای Orchestration بدهیم:
  ابزارهای Orchestration در مفهوم معماری نرم‌افزار مرتبط با مدیریت و کنترل منابع و سرویس‌های مختلف یک برنامه یا سیستم را مشخص و کنترل می‌کنند. در محیط‌های پیچیده که برنامه‌ها به صورت توزیع‌شده و متشکل از اجزای مختلف هستند (مانند میکروسرویس‌ها)، نیاز به کنترل مرتبط با مدیریت، پیکربندی، اجرا، مقیاس‌پذیری، و مانیتورینگ این اجزا وجود دارد. ابزارهای Orchestration این نیازها را با اتوماسیون‌های پیش‌فرض و قابل پیکربندی فراهم می‌کنند.

  کامپوز یک ابزار Orchestration است که ایجاد برنامه‌های توزیع‌شده چند-کانتینری با داکر را هندل می کنید می توان گفت: چرخش برنامه های کاربردی توزیع شده چند کانتینری با Docker را به یک کار بی دردسر تبدیل می کند. موارد مشابهی نیز وجود دارد مانند Kubernetes 


