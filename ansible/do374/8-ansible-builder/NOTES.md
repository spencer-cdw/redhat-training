
ansible-builder create #Optional, only if you need to manually modify build context
ansible-builder build -t ee-motd-minimal:1.0
podman images localhost/ee-motd-minimal

ansible-navigator images --pp never --eei localhost/ee-motd-minimal:1.0