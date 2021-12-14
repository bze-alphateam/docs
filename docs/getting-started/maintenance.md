# Maintenance Tasks for Node and Validator

<!-- MarkdownTOC autolink="true" levels="1,2,3" -->

- [Validator Migration to New Server](#validator-migration-to-new-server)
    - [PART 0: Configuration files location](#part-0-configuration-files-location)
    - [PART 1: Steps to perform on existing validator](#part-1-steps-to-perform-on-existing-validator)
    - [PART 2: Steps to perform on new server](#part-2-steps-to-perform-on-new-server)

<!-- /MarkdownTOC -->


## Validator Migration to New Server

**What is validator migration?**

Validator migration is a process of assuming validator role on new node.
That will turn new full node into validator. This process is important part of providing infrastructure services for Vidulum chain.


**When validator needs to be migrated?**

Here is few situations which might required validation service to be moved:
 - Server ran out of resources and can't be expanded - move to new server required
 - System crashed and needs to be reinstalled - fresh start
 - Maintenance of current system and validation service will be moved to backup node for that period


::: tip NOTE:
Please follow migration steps very carefuly. If you are not sure about certain steps or need more clarification, reach out to our validator community on Discord, please.
Be aware that running two nodes as validators with same key will lead to slashing and might lead to validator account being tombstoned.

**If you want to evaluate presented process use Vidulum Testnet, which is kept running for evaluation, testing and learning purposes.**
:::


### PART 0: Configuration files location
Configuration of node and validator is stored in
```bash
${HOME}/.vidulum/config
```

::: tip NOTE:
Same configuration files can be found on full node and on validator.
:::

When you look into that folder you will for sure find files listed below:
```bash
.vidulum/
└── config
    ├── addrbook.json
    ├── app.toml
    ├── client.toml
    ├── config.toml
    ├── genesis.json
    ├── node_key.json
    └── priv_validator_key.json
```
There might be more files, but those presented are crucial for us.


### PART 1: Steps to perform on existing validator

#### Stop and disable Vidulum service
In this step we will stop and disable existing Vidulum service.
```bash
sudo systemctl stop vidulum.service
sudo systemctl disable vidulum.service
```

To make sure that service has been stopped you can check if any new logs are generated by service
```bash
sudo journalctl -u vidulum -f
```
If there will be no new output coming on screen it means service is stopped.


#### Rename files containing validator keys
```bash
mv ${HOME}/.vidulum/config/node_key.json ${HOME}/.vidulum/config/node_key.json.validator
mv ${HOME}/.vidulum/config/priv_validator_key.json ${HOME}/.vidulum/config/priv_validator_key.json.validator
```
**NOTE:** Renaming files containing key will prevent service from accidental start, which might drive to trouble. It is not required, but highly recommended.


#### Copy validator keys to new system
In order to start another system with validator role, we need to transfer files containing keys to new system.
Presented commands are just example and in case you have different method of transferring files to destination system, please adjust steps to match your process.
```bash
scp ${HOME}/.vidulum/config/node_key.json.validator vidulum@your.new.server.ip:/home/vidulum/.vidulum/config
scp ${HOME}/.vidulum/config/priv_validator_key.json.validator vidulum@your.new.server.ip:/home/vidulum/.vidulum/config
```


### PART 2: Steps to perform on new server

::: tip NOTE:
Assumption is that new system, which will assume validator role is already configured as Vidulum full node and fully synchronized.
:::

#### Stop and disable Vidulum service
In this step we will stop and disable existing Vidulum service.
```bash
sudo systemctl stop vidulum.service
sudo systemctl disable vidulum.service
```

To make sure that service has been stopped you can check if any new logs are generated by service
```bash
sudo journalctl -u vidulum -f
```
If there will be no new output coming on screen it means service is stopped.


#### Rename files containing node keys
```bash
mv ${HOME}/.vidulum/config/node_key.json ${HOME}/.vidulum/config/node_key.json.node
mv ${HOME}/.vidulum/config/priv_validator_key.json ${HOME}/.vidulum/config/priv_validator_key.json.node
```
**NOTE:** Renaming existing keys instead of removeing them allows to revert configuration back. That is especially important if Validator role is moved to different system temporarily for maintenance purposes.


#### Enable validator keys
This step assumes that keys copied from original validator are located in Vidulum node config folder.
```bash
cp ${HOME}/.vidulum/config/node_key.json.validator ${HOME}/.vidulum/config/node_key.json
cp ${HOME}/.vidulum/config/priv_validator_key.json.validator ${HOME}/.vidulum/config/priv_validator_key.json
```


#### Restart service
All components are now in place, so it is time to start node and assume Validator role.
```bash
sudo systemctl enable vidulum.service
sudo systemctl start vidulum.service
```

First thing node will have to do is to catch-up with chain.
To check node status
```bash
curl http://localhost:26657/status
```

In output look for following line:
```bash
catching_up: false
```

If status if ***false*** it means node is fully synchronized. At that point you should see in explorer that your node start signing blocks again.