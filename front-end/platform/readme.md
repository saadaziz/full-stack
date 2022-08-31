# front-end-platform
- responsible for creating the skeleton, with core website 
- micro-front-end applications will use this platform as a "container"
- "container" will encapsulate behaviors enabling run time dependency management

## architecture
As is:
![As is](https://lh3.googleusercontent.com/pw/AL9nZEXA7qiobaesUb04U7MXQ8htX4qNcd_Yuyfc2olsFXlYoAdHTL1EW-23tOSD6iaipTnVLd3_8SUa2yedZvFVY2jwY0ARZ2bY0rgU7OH8a-IC9y89ERFPT1I_Lm7RXuZC3xO_j6vYEa-owNTF0aRCjf7c=w1173-h622-no?authuser=0)

### platform
- note, this folder, platform is a "micro" front-end application
- it provides a "container" for child applications to "dynamically" bind to at run time

## build distribution
- npm run build

### creates bundle using webpack
As is:
![As is](https://lh3.googleusercontent.com/pw/AL9nZEWoEdH8eSTiodGqcfuLwKeZURBRS8H08NPv-YBPs03gaHcghvQfKubK64dTfW1Vf47XnVEB3ZzP0xVpZY6eIDIotuEdCn1m7bnxff64McdwoPS8QUg7-z0yv_VbAWh4sLnymHeCIcnZ7J178K_S-Pfh=w1759-h969-no?authuser=0)

### web pack five and module federation make for a powerful distributed system in the browser
[Webpack 5 and Module Federation]("https://medium.com/swlh/webpack-5-module-federation-a-game-changer-to-javascript-architecture-bcdd30e02669")