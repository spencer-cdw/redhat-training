

```yaml
- name: Postfix and Dovecot are running
  ansible.builtin.service:
    name: "{{ item }}"
    state: started
  loop:
    - postfix
    - dovecot

```


Loop over vars

```yaml
vars:
  mail_services:
    - postfix
    - dovecot

tasks:
  - name: Postfix and Dovecot are running
    ansible.builtin.service:
      name: "{{ item }}"
      state: started
    loop: "{{ mail_services }}"
```


loop vs with_items

They are the same however, `with_items` is the older syntax. `loop` does nont flatten lists like `with_items` does. 


## Register 

When using `register` with loops, the results are stored in an array (list)

```yaml
---
- name: Loop Register Test
  gather_facts: no
  hosts: localhost
  tasks:
    - name: Looping Echo Task
      ansible.builtin.shell: "echo This is my item: {{ item }}"
      loop:
        - one
        - two
      register: echo_results1

    - name: Show echo_results variable
      ansible.builtin.debug:
        var: echo_results2
```

## Conditionals


```yaml
- name: test
  hosts: all
  vars:
    foo: true

  tasks:
    - name: do something
      dnf:
        name: httpd
      when: foo  # This only runs when foo is true
```

Ansible YAML files are based on the YAML 1.1 standard, but the YAML 1.2 standard specifies that you can only use true or false to set Boolean values. For this reason, you might see gradual standardization toward using only true or false for Boolean values in playbooks and other Ansible files, even though the equivalent ways to express those values are still valid. Whether Ansible should eventually use only those ways of expressing Boolean values is an open question and an ongoing discussion in the Ansible community.

Note:

`foo: "false"`

is not the same as 

`foo: false`

For extra safety you can cast to a boolean

`when: foo | bool`


### Conditional examples


- ansible_facts['machine'] == "x86_64"
- max_memory == 512
- min_memory < 128
- ansible_facts['distribution'] in supported_distros #(Where supported_distros is a vars)


`when: ansible_facts['distribution'] == "RedHat" or ansible_facts['distribution'] == "Fedora"`
`when: ansible_facts['distribution'] == "9.0" and ansible_facts['kernel'] == "5.14.0-70.13.1.el9_0.x86_64"`

Or you can do this syntax

```yaml
when:
  - ansible_facts['distribution_version'] == "9.0"
  - ansible_facts['kernel'] == "5.14.0-70.13.1.el9_0.x86_64"
```
