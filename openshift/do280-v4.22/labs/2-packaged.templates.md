# Packaged Templates


Get the templates

```bash
oc get templates -n openshift
oc describe template mariadb-persistent -n openshift
```

Deploy new app from existing template, modifying 2 parameters
```bash
oc new-project packaged-templates
oc new-app --template mariadb-persistent -P MYSQL_USER=user1 -P MYSQL_PASSWORD=mypassword
watch oc get pods
oc run query-db -it --rm \
    --image registry.lab.example.com:8443/rhel10/mariadb-118:latest \
    --restart Never --command -- /bin/bash -c \
    "mariadb -uuser1 -pmypasswd --protocol tcp --skip-ssl \
    -h mariadb -P3306 sampledb -e 'SHOW DATABASES;'"
```

View parameters with `oc process`

oc process --parameters roster-template
oc process roster-template -p MYSQL_USER=user1 -p MYSQL_PASSWORD=mypasswd -p INIT_DB=true | oc apply -f -


### From file

Use the `oc process` with `--param-file` and pipe to `oc diff` and `oc apply`

oc process roster-template --param-file /home/student/DO280/labs/packaged-templates/roster-parameters.env | oc diff -f -
oc proces roster-template --param-file /home/student/DO280/labs/packaged-templates/roster-parameters.env | oc apply -f -