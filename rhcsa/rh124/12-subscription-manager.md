# Subscription Manager

Ways to register

- Open subscription manager application on rhel gui
- Open from copilot web console
- `subscription-manager register --username=<username> --password=<password>`


Other commands

subscription-manager list --available
subscription-manager list --consumed
subscription-manager attach --pool=<pool_id>
subscription-manager unregister

## rct

`rct` - view certificates

```bash
/etc/pki/product
/etc/pki/consumer
/etc/pki/entitlement
```
