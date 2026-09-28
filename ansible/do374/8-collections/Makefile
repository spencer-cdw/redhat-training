.PHONY: ee collection

REGISTRY=hub.lab.example.com
IMAGE_NAME=ee-training-rhel8
CONTEXT=context
BUILD_DIR=ee-build
DEFAULT_VERSION=1.0

collection:
	cd collections/student/testcollection && \
	ansible-galaxy collection build -f

	VERSION=$$(grep version: collections/student/testcollection/galaxy.yml | awk '{ print $$2}') && \
	ansible-galaxy collection publish collections/student/testcollection/training-web-$$VERSION.tar.gz

ee:
	cd $(BUILD_DIR) && \
	VERSION=$$(bash -c 'read -p "Enter Version (default is $(DEFAULT_VERSION)): " version; if [ -z "$$version" ]; then echo "$(DEFAULT_VERSION)"; else echo "$$version"; fi') && \
	podman system prune -f && \
	podman build -f $(CONTEXT)/Containerfile -t $(REGISTRY)/review/$(IMAGE_NAME):v$$VERSION && \
	podman push $(REGISTRY)/review/$(IMAGE_NAME):v$$VERSION
