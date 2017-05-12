```sh
# staging
ansible-vault --vault-password-file .vaultpass \
  ansible/group_vars/staging.yml edit

# production
ansible-vault --vault-password-file .vaultpass \
  ansible/group_vars/production.yml edit

# aptos
ansible-vault --vault-password-file .vaultpass \
  manage/group_vars/aptos.yml edit
```

**Environment variables require a deploy.** They're stored as encrypted files using Ansible Vault.
