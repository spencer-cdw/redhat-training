# oc commands


oc login --web
oc whoami
oc version
oc cluster-info
oc api-versions
oc get clusteroperator


Rather than specifying the namespace like with kubectl. 
With oc, you 'switch' to a project then the following commands run inside that namespace

### Change projects
oc project foobar
oc status
oc explain services
oc get pods -o wide
oc describe route foobar


Other commands you can provide the -n

oc get pvc -n foobar

oc get nodes