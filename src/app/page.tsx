const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to Hire an Adventurer!</h1>

      <p className="mt-4 mb-5 italic">
        Dragon destroying your town?  Minotaur mashing your village?  Goblins going berserk?!
        Hire some adventurers to put the problem to rest!
      </p>
      <p className="mt-4 mb-5">
        In this simulation, you start with 100 silver coins.  You can hire adventurers to take
        care of a random issue plaguing your town or village.   If you can defeat two challenges
        before running out of silver, you win!
      </p>
      <p className="mt-4 mb-5">
        This program functions similar to a simple e-commerce site.  You load you your cart
        with adventurers to hire. You can add and remove adventurers from your cart.
        Hiring the adventurers will deduct from your stash of silver coins.
      </p>
      <p className="mt-4 mb-5">
        Once you have hired your adventurers on the cart page, you will be taken to the resolution page 
        (you will be able to go back and hire more if you decide to).  When you are ready, it will
        will display the random monster(s) that are causing the ruckus, and weather or not your
        selected group of adventurers successfully defeated them.
      </p>
      <p>
        As of this writing, the backend and database are simulated, so no progress is saved if 
        you refresh the page. This will be rectified in a near-future version.
      </p>
      <p className="mt-4 mb-5">
        To start, simply go to the Available Adventurers section -- the button is to the left.
      </p>
    </>
  );
};

export default Home;
