# Packaged Apps

Packaged templates are similar to kustomize, but are openshift specific. 




## Templates

Default templates are in the `openshift` namespace

`oc get templates -n openshift`

`oc describe template postgresql-ephemeral -n openshift`

To view information about template, use `oc process`

`oc process --parameters postgresql-ephemeral -n openshift`

or use `-f` to view files
templates can be stored both on disk, or in the cluster

`oc process --parameters -f my-postgresql.yaml`

`oc get template postgresql-ephemeral -o yaml -n openshift`

### Use Template

`oc new-app --template postgresql-ephemeral -p POSTGRESQL_USER=my-user`


### Deploy from Template

`oc process foobar -p POSTGRESQL_USER=user1 -o yaml > foobar.yaml`
`oc process -f foobar.yaml -p POSTGRESQL_USER=user1 -o yaml > foobar2.yaml`

or do oc process and pipe to oc apply

```bash
cat >> my-postgresql-params.env <<'EOF'
MEMORY_LIMIT=1024Mi
POSTGRESQL_USER='db-user'
POSTGRESQL_PASSWORD='my-secret-password'
EOF
oc process my-postgresql \
--param-file my-postgresql-params.env | oc apply -f -
```

### Copy Templates

Better to get the template and store in version control

```bash
oc get template postgresql-ephemeral -o yaml -n openshift > my-postgresql.yaml
```

Then
1. Rename the template
2. Remove namespace field of template resource

### Manage own templates

Best practice is to take the templates from the `openshift` namespace and modify them and save them in your own namespace (e.g. `shared-templates`)

oc create -f my-postgresql.yaml
oc create -f my-postgresql.yaml -n shared-templates

### Import templates

You can 'import' templates from disk
```bash
oc create -f \
~/DO280/labs/packaged-templates/custom-template/roster-template.yaml
oc get templates
oc describe template roster-template
```

## Delete

To delete, get all apps with labels, then delete everything with a matching label

```bash
oc get all --show-labels
oc delete all -l app=mariadb-persistent
oc delete secret mariadb
oc delete pvc mariadb
```