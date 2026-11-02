# Labels

There are 2 types of labels, Labels applied for services can't be at the top layer, they need to be at the vm template layer

`.spec.template.metadata.labels`


```yaml
spec:
  template:
    metadata:
      labels:
        app: mariadb
```


**You must restart the VM before the labels are applied**

Migration isn't enough. 

You can verify by slecting the pod and observing that the label is also on the virt-launcher pod