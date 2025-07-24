const HomePage = async () => {
  return (
    <>
      <h2 className="text-3xl font-bold">Welcome to Hire an Adventurer!</h2>

      <p className="mt-4 mb-5 italic">
        Dragon destroying your town?  Minotaur mashing your village?  Goblins going berserk?!
        Hire some adventurers to put the problem to rest!
      </p>
      <p className="mt-4 mb-3">
        In this simulation, you start with 200 silver coins.  You can use this silver to hire adventurers
        to fight the monsters plaguing your village.  See how many monsters you can defeat and how high of 
        a score you can get before you either run out of silver, or the pool of adventurers are all defeated!
      </p>
      <p className="mt-4 mb-3">
        To start, simply go to the Available Adventurers section (the button is to the left on the navbar).
      </p>
    </>
  );
};

export default HomePage;
