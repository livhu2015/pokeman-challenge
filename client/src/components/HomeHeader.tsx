enum ClassNames {
  Header = "grid place-items-center py-10",
  HeaderTitle = "text-4xl font-black p-2 text-primary",
  HeaderText = "text-xl font-thin p-2 text-accent",
}

export const HomeHeader = () => {
  return (
    <div className={ClassNames.Header}>
      <h3 className={ClassNames.HeaderTitle}>Pocket Monsters</h3>
      <p className={ClassNames.HeaderText}>
        A fictional class of pet monsters.
      </p>
    </div>
  );
};
