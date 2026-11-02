# Running containers

https://rol.redhat.com/rol/app/courses/do180-4.18/pages/ch03s02


`oc run resource/name --image IMAGE <options>`

`oc run web-server --image registry.access.redhat.com/ubi10/httpd-24`

Interactive pod using `-it`

`oc run -it my-app --image registry.access.redhat.com/ubi10/ubi --command -- /bin/bash`


## Users

You can view the uid and gid that the pod is running with describe

```bash
oc describe project my-app
			   openshift.io/sa.scc.supplemental-groups=1000710000/10000
			   openshift.io/sa.scc.uid-range=1000710000/10000
```

10,000 unique UIDs are available starting at 1000710000. They are randomly assigned per project and reused for security.

Note that USER is always ignored and openshift assigns a random UID.
GID is always 0 (root), but because the process runs as non-root it is more secure. 




## PSA

Pod Security Admission controller

enforces security profiles at teh namespace level. 

### SCC

Security Context Constraints

## Logs

oc logs postgresql-1-jw89j --tail=10

## Attach
```bash
oc attach my-app -it
oc attach my-app -c container-name -it
```

## Exec

To run a command inside a specific pod in an app use -c

```bash
oc exec my-app -c ruby-container -- date
```

## Delete


```bash
oc delete pod foobar
oc delete pod -l app=foobar
oc delte pod -f ~/foobar.yaml
oc delete pod foobar --grace-period=10
oc delete pod foobar --now
```