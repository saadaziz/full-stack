# front-end
- As we evolve, engineering teams are looking for ways to preserve energy and to focus that raw power. 
    - A common source of frustration can be working together on large and complex systems. 
    - Naturally, we all know that to solve a large problem, is to break it down into smaller pieces.
- How do we eat a giant avocado? 
    - We break it down into smaller and smaller chunks, until its the right size.
- Similarly, we can extend this approach to our front end.

## micro is the new trend
- For good reason, it allows us to focus on the customer journeys.
- Teams have ownership of the entire customer journey.
- Each team can accelerate outcomes safely as the surface area is reduced by incremental deployments of fine grained layers of functionality.

### high level architecture
As is:
![As is](https://lh3.googleusercontent.com/pw/AL9nZEWKGz5Fbizsm4F6fYWu2xywvTefSSKpz_GLLgLrlcJxadJxreaVH5MvyxjGsxBR-LYTHxRiD0IENNVEHnnUZxb7Hd4He7SgQmLcu_lE2qgkaUHp84Zce1wzCgr-EgeHcIDSPBQ_Hs8pX25z_WOiYD3z=w1884-h788-no?authuser=0)

### why micro front ends
- The main benefits we are expecting
    - Deploying independent layers without impacting other components
    - Granular releases, enabling multivariate testing
    - Components can incrementally evolve over time in the direction teams' see fit

### test for completion
- How will I know that the vision has come true?
    - Two types of applications
        - Parent
            - Platform container, provides a run time container for children
        - Child
            - Modular "mini application", for example, user identity
- How will we measure success?
    - Run time injection
        - The parent container makes HTTP requests at run time to fetch resources the child application needs, as needed
    - Deployability
        - The parent and child applications can be deployed independent of the rest of the stack
    - Independence
        - Each app, child or parent can be eployed without needing to change, after initial setup is complete
    - Communication flow
        - Additionally, the contents are served independently, then aggregated for a final response
- What business outcome does this enable?
    - We can easily perform A/B testing, easily switching between child components and measuring KPI
