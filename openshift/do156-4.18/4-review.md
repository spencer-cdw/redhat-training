# Review

Verify the HTTP connectivity from the rhel9-external VM to the rhel9-apache1 VM by using the curl command.

Problem: Figure out how to login
Solution: console-openshift-console.apps.ocp4.example.com


Bakup database

mysqldump -v -h 192.168.51.15 -u devuser -p'developer' \
  --all-databases > backup_db.sql