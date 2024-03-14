# Containers

https://rol.redhat.com/rol/app/courses/rh134-9.0/pages/ch13


Containers use these technologies

- cgroups
- namespaces
- selinux/seccomp

`dnf install container-tools`

## Tools

- `podman`
- `skopeo` (Inspects, signs images)
- `buildah` (Creates images)


`podman info` (shows current config, registries ect..)

## Container Registries

- registry.redhat.io (offical channel)
- registry.connect.redcat.com (3rd party products)


Multilpe ways to login

`podman login registry.lab.example.com`

`echo $PASSWORDVAR | podman login --username foo --password-stdin registry.access.redhat.com`


### Podman

podman does not use a daemon, so it does not need root privilages to run.


### Config

The config for container registires is stored in 

`/etc/containers/registries.conf`

Its recomended to make your own config for non privileged username

`~/.config/containers`


### Names

You can use short names or fully qualified names

`podman pull ubi`
`podman pull registry.access.redhat.com/ubi8/ubi:latest`



### Search

Some container registires allow searching

`podman search python-38`

Note, that you might need to add a `/` to the search 😠

`podman search registry.lab.example.com` (does not work)
`podman search registry.lab.example.com/` (does work) 


## Skopeo

skopeo does many of the same things as `podman inspect`, however it allows for 
inspecting containers _before_ you pull them, which is kind of cool I guess 🤷‍♂️

`skopeo inspect docker://registry.access.redhat.com/ubi8/python-38`


## Using Containers

`podman cp`

You can copy a file into a docker container with `podman cp`

```bash
podman cp /tmp/hello.sh python38:/tmp/hello.sh
podman exec python38 stat /tmp/hello.sh
podman exec python38 bash /tmp/hello.sh
```