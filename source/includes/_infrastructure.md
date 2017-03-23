# Infrastructure



## How To

### Deploy

#### Overview

```sh
sh bin/deploy.sh <app> <env> <repo> <commit>
```

The output (if there's no error) will be a deployment ID, such as `d-96I9EBUEL`. You can use this identifier to check the status of the deployment.

Note that this is just a wrapper for the `awscli` package, which provides much more control over the system.

<div></div>

#### Examples

```sh
# deploy UBIQ to the staging environment
sh bin/deploy.sh \
  ubiq \
  staging \
  jakoenterprise/ubiq-magento \
  7de0d6692209457c5e0fd8897add2f9266346c0a
```

### Check Deploy Status

#### Overview

```sh
sh bin/status.sh <deploy-id>
```

The output will be some info about the deployment.

Note that this is just a wrapper for the `awscli` package, which provides much more control over the system.

<div></div>

#### Examples

```sh
sh bin/status.sh d-96I9EBUEL
```
