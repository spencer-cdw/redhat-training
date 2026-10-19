oc login -u developer -p developer \
  https://api.ocp4.example.com:6443

oc project storage-review

oc get pvc

virtctl guestfs rhel-golden-volume
virt-sysprep -a /dev/vda

virtctl image-upload dv dev-server-restored-disk \
  --size=10Gi --image-path=dev-server-disk.img.gz

virtctl create vm --name=dev-server-restored \
  --volume-pvc=src:dev-server-restored-disk | oc apply -f -