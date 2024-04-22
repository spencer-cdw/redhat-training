# Grouping

Hosts can be in multiple groups

[usa]
foo.example.com

[canada]
foo.example.com


## Ranges

```bash
192.168.[4:7]
```
```bash
[usa]
washington[1:2].example.com
```


## Verify inventory

```
ansible-navigator inventory -m stdout --host foo.example.com
ansible-navigator inventory -m stdout --list
```


## Children groups

```
[raleigh]
foo

[mountainview]
bar

[us:children]
raleigh
mountainview
```

## Graph

```bash
ansible-navigator inventory -i inventory -m stdout --graph webservers
ansible-navigator inventory -i inventory -m stdout --graph us
```



