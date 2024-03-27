# Test Numbers

EX294

https://www.redhat.com/en/services/certification/rhce?info=future

Recomended Preequisits

- RH294

## Tips

1. Do not optimize

Do not optimize your code or worry about linting. The tests only cares about results, not how pretty the code is to get there

For example, instead of doing `ansible.builtin.yum` just do `yum`. 

2. AdHoc commands

Take advantage of ansible adhoc commands. For example, instead of writing a playbook to install a package, do something like this

`ansible node1.example.com -m yum -a "name=httpd state=present" --become`

You won't need to preserve the playbook, focus on results, not method. 

3. Speed up ansible navigator pull policy

Ansible navigator is slow, speed it up by doing `--pp missing` or `--pp never`
You can optionally generate an ansible-navigator.yml file and uncomment the lines there

## Setup

Install ansible through subscription manager (don't use pip, despite what some docs say)

```bash
subscription-manager list --available
subscription-manager attach --pool=xxxxx
subscription-manager repos --list | grep ansible
subscription-manager enable --repo ansibvle-automation-platform2.4-for-rhel-9-aarch64-rpms
dnf install ansible-navigator vim rhel-system-roles
```

To install the default exection environment, just run `ansible-navigator`

## Generate ansible navigator config

```bash
ansible-navigator settings --sample --eei ee-supported-rhel8 -m stdout --pp missing > ansible-navigator.yml
```

## Running

Ansible navigator does not support for interactive passwords such as --ask-become-pass unless you use `-pae` to disable the artifacts. 

```bash
ansible-navigator run -m stdout-i assets/inventory.ini --pae false -uadmin -k -b -K simple.yml
```


## Collections
ansible-galaxy collection install community general -p collections


## Resources

https://www.youtube.com/watch?v=GL8NRBQulhQ
https://www.youtube.com/watch?v=f4_AI1yRAg4
https://github.com/mateuszstompor/rhce-ex294-exam
https://github.com/sandervanvugt/rhce8-book
https://github.com/sandervanvugt/rhce8