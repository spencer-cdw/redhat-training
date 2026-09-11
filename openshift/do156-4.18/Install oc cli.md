## Install kubectl / OC

### Curl 

To install with curl (simplest). 
For non-root you can install to ~/.local/bin. See [docs](https://kubernetes.io/docs/tasks/tools/install-kubectl-linux/)

```bash
curl -LO "https://mirror.openshift.com/pub/\
openshift-v4/amd64/clients/ocp/stable-4.18/openshift-client-linux-4.18.19.tar.gz"

curl -LO "https://mirror.openshift.com/pub/\
openshift-v4/amd64/clients/ocp/stable-4.18/sha256sum.txt"

sha256sum -c --ignore-missing sha256sum.txt

sudo install -o root -g root -m 0755 kubectl \
  /usr/local/bin/kubectl
```

### Yum

```bash
cat <<EOF | sudo tee /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://pkgs.k8s.io/core:/stable:/v1.31/rpm/
enabled=1
gpgcheck=1
gpgkey=https://pkgs.k8s.io/core:/stable:/v1.31/rpm/repodata/repomd.xml.key
EOF

sudo yum install -y kubectl
```