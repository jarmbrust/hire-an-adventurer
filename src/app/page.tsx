const HomePage = async () => {
  return (
    <>
      <h2 className="text-3xl font-semibold">Welcome to Hire an Adventurer!</h2>

      <p className="mt-4 mb-5 text-lg italic">
        Dragon destroying your town?  Minotaur mashing your village?  Goblins going berserk?!
        Hire some adventurers to put the problem to rest!
      </p>
      <p className="mt-4 mb-3">
        In this simulation, you start with 200 silver coins.  You can use this silver to hire adventurers
        to fight the monsters plaguing your village.  See how many monsters you can defeat and how high of 
        a score you can achieve before you either run out of silver, or the pool of adventurers are depleted!
      </p>
      <p className="mt-4 mb-3">
        To start, simply go to the Available Adventurers section (the button is to the left on the navbar). From there,
        you can select the adventurers you want to hire, then go to the Adventurer Cart to hire them.  Then, off to 
        battle the monsters!
        <span className="mt-2 pl-4 block">
          * Keep in mind that if the adventurers loose the fight, you get no points, and the adventurers will be fatigued or injured.
          Once in that condition they have an increased chance of injury (if not already injured), or even death if they are
          hired and sent off again to fight.
        </span>
        <span className="pl-4 block">
          ...And, well, you can&apos;t hire dead adventurers.
        </span>
      </p>
    </>
  );
};

export default HomePage;
