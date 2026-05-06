# Stratis

https://stratis-storage.github.io/

Stratis provides thin provisioning. 

dnf install stratis-cli stratisd

stratis pool create pool1 /dev/vdb
stratis pool list

stratis pool add-data pool1 /dev/vdc
stratis blockdev list pool1

stratis filesystem create pool1 fs1
stratis filesystem list