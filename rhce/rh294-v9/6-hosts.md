# Hosts



## AND

Using `&` to only run on servers that are in the lab group and datacenter1 group.

```
hosts: lab,&datacenter1
```

## OR

Don't run on servers that are in the lab group and test2.example.com

```yaml
hosts: datacenter,!test2.example.com
```
