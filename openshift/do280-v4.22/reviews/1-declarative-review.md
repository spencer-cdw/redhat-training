https://rol.redhat.com/rol/app/courses/do280-4.22/pages/ch01s05


The API URL of your OpenShift cluster is https://api.lab.example.com:6443, and the oc command is already installed on your workstation machine.


1. > Clone the v1.1.0 version of the application from the https://git.lab.example.com/developer/declarative-review.git URL. 
Because this repository uses Git branches to represent application versions, you must use the v1.1.0 branch.


2. > Examine the v1.1.0 version of the application. The application consists of a web application that relies on a database.


3. > Log in to the OpenShift cluster as the developer user with developer as the password. Deploy the base directory of the repository to a new declarative-review project. Verify that the v1.1.0 version of the application is available at https://exoplanets-declarative-review.apps.lab.example.com


4. > Change to the v1.1.1 version of the application by using the v1.1.1 branch of the repository. Examine the changes.

5. > Deploy the updated application and verify that the URL now displays the v1.1.1 version.

6. > Examine the overlay in the overlays/production directory.

7. > Deploy the production overlay to a new declarative-review-production project. Verify that the v1.1.1 version of the application is available at https://exoplanets-declarative-review-production.apps.lab.example.com with two replicas.


lab grade declarative-review

lab finish declarative-review