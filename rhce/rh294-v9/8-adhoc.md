# Adhoc commands


`ansible <host-pattern> -m <module> [-a module arguments] [-i inventory]`


Note that if you skip `-m`, ansible assumes `ansible.builtin.command` by default

### Examples

ansible foobar -m ansible.builtin.ping
ansible foobar -m ansible.builtin.ping --become
ansible foobar -m ansible.builtin.stat -a path=/etc/foobar
