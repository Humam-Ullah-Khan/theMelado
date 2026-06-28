sc config MongoDB binpath="\"C:\Program Files\MongoDB\Server\8.0\bin\mongod.exe\" --dbpath D:\humam\Melado\mongodb-data --logpath D:\humam\Melado\mongodb-data\mongod.log --service --serviceName MongoDB"
net stop MongoDB
net start MongoDB
