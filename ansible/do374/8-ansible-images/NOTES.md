
ansible-navigator run motd-test.yml --eei localhost/ee-motd-minimal --pp never --pae false -k -m stdout
podman tag localhost/ee-motd-minimal hub.lab.example.com/ee-motd-minimal


Ansible navigator doesn't allow prompting for password, you can bypass this by disabling artifacts `--pae false` and using `-k` to prompt for password


```yaml
ansible-navigator:
  execution-environment:
    enabled: True
    container-engine: podman #set to docker for mac users
    image: localhost/ee-motd-minimal
    pull:
      policy: missing
```