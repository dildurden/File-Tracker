                     *** FILE TRACKER***


**Brief description:**
In this project we use the Hyperleger sawtooth based application for tracking the files.


**Description:**

Transparency have a great role in governance.Transparecy in every domain of governance is important.
Files have great role in governance.As it is the process of creating files for each and every thing.
Redtapism is also closely assosciated with files.

The issues related with paper files are:

File Tampering
File Delay
File misplacement
file Destruction


The advantages of digital files

Easily tracable
Can be recovered



Why blockchain is used?

The immutabilty property is very useful for digital files.Hyperledger sawtooth helps us to apply
the blockchain concept in file tracking.
The blockchain recordes each and every transaction done on each file.
The time stamp and address wil give us who has done the transaction at what time.
So file tampering can be avoided.Accountabilty of each person involved is ensured.


**System requirements:**

1. Operating system: Ubuntu 16.04
2. System RAM: 4 GB or above (recommended 8 GB)
3. Free System storage: 4 GB on /home


**Installation prerequisites:**

1. Docker must be installed in the system
2. docker compose must be installed


3. Ensure that NodeJS (version 8.15 ideally) is installed in the system. For more information about NodeJS, go to https://nodejs.org. To check if installed, open a terminal window: and give the command
   (-) node -v
4. If NodeJS is not installed, go to https://nodejs.org and download the compatible version (version 8.15) based on system OS, or in a terminal window: and give the command
   (-) sudo apt-get install -y nodejs
5. Ensure that Docker is installed. Docker is a platform for developers and system administrators to develop, ship, and run applications. For more information, go to https://www.docker.com/resources/what-container. To check if installed, in the terminal window: give the command
   (-) sudo docker --version
6. If Docker is not installed, in the terminal window:
   SET UP THE REPOSITORY
   Update the apt package index:
   (-) sudo apt-get update
   Install packages to allow apt to use a repository over HTTPS:
   (-) sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
   Add Docker’s official GPG key:
   (-) curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
   Use the following command to set up the stable repository.
   (-) sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   (-)(lsb_release -cs) \
   stable"
   INSTALL DOCKER CE
   Update the apt package index.
   (-) sudo apt-get update
   Install the latest version of Docker CE.
   (-) sudo apt-get install docker-ce
   Verify that Docker CE is installed correctly by running the hello-world image.
   (-) sudo docker run hello-world
   This command downloads a test image and runs it in a container. When the container runs, it prints an informational message and exits.
7. Ensure that Docker Compose is installed. Compose is a tool for defining and running multi-container Docker applications. To check if installed, in the terminal window:
   (-) sudo docker-compose --version
8. If Docker Compose is not installed, in the terminal window:
   (-) sudo apt-get update
   (-) sudo apt-get install docker-compose


**Instructions for Installation of Application:**

1. Download the folder "File-Tracker"
2. Open terminal from the folder "File-Tracker" and give the command 
3. (-) sudo docker-compose up
4. After running all the containers 
5.  Open another terminal from the same folder "File_tracker" and give the command 
6. (-) sudo docker exec -it validator bash
7. This will open the validator bash and we have to set the permissions in this validator bash by giving the commands below


----------------------------------------

14. Now go to the browser and go to http://localhost:3000
15. Now you can access the application using the clerks private key from keys.txt
16. To terminate the app execution, go to the terminal window (where docker-compose is running) and give CTRL+C
17. Wait for docker-compose to gracefully shutdown. Then: give the command
    (-) sudo docker-compose down








