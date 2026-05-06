# Debugging


- v
- vv
- vvv
- vvvv

```yaml
- name: Display free memory
  ansible.builtin.debug:
    msg: "Free memory for this system is {{ **ansible_facts[**'memfree_mb'] }}"
```


```yaml
- name: Display the "output" variable
  ansible.builtin.debug:
    var: output
    verbosity: 2
```


### Syntax check

```bash
ansible-navigator run -m stdout playbook.yml --syntax-check
```


### Lint

Lint does not use ansible-navigator, it is a standalone app and doesn't use the execution environment. 
There is an expirimental linter that can be enabled, but its not installed by default on the standard execution environments.


```bash
ansible-lint playbook.yml
```


## Remote Host

Most common issue with connection is the `ansible_host` or `remote_user` parameter
In inventory you can overwride the values

```
[web]
server1 ansible_host=192.0.2.0
```


## Dry Run

Ansible-navigator has a `--check` option which executes a dry run
(Note that conditionanls don't always work properly in a --check run)

```bash
ansible-navigator run -m stdout playbook.yml --check
```
