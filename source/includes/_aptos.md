# Aptos

### Aptos Deploy

```sh
```

This process is a legacy deployment process, it's sticking around until we're able

### Aptos IP Whitelist

```sh
# deploy UBIQ to the production environment
sh bin/deploy.sh \
  ubiq \
  production \
  jakoenterprise/ubiq-magento \
  7de0d6692209457c5e0fd8897add2f9266346c0a

# deploy UBIQ to the staging environment
sh bin/deploy.sh \
  ubiq \
  staging \
  jakoenterprise/ubiq-magento \
  7de0d6692209457c5e0fd8897add2f9266346c0a

# deploy UBIQ to the production environment
sh bin/deploy.sh \
  ubiq \
  production \
  jakoenterprise/ubiq-magento \
  7de0d6692209457c5e0fd8897add2f9266346c0a

# deploy UBIQ to the aptos environment
# YOU MUST BE IN THE ubiq-magento REPO TO MAKE THIS HAPPEN
git checkout aptos
ansible-playbook \
  -i manage/hosts/aptos \
  --vault-password-file .vaultpass \
  manage/deploy.yml

# deploy KicksUSA to the staging environment
sh bin/deploy.sh \
  kicksusa \
  staging \
  jakoenterprise/kicksusa-magento \
  COMMIT-ID

# deploy KicksUSA to the production environment
ansible-playbook \
  -i manage/aws/hosts/production \
  --vault-password-file .vaultpass \
  manage/aws/provision.yml \
  -t kicksusa

# deploy KicksUSA to the aptos environment
# YOU MUST BE IN THE kicksusa-magento REPO TO MAKE THIS HAPPEN
git checkout aptos
ansible-playbook \
  -i manage/hosts/aptos \
  --vault-password-file .vaultpass \
  manage/deploy.yml
```
