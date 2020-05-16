const Tabs = () => {
  const [index, setIndex] = useState(0);
  const [active, setActive] = useState(0);

  let ret = "";

  for (const [i, child] of props.children.entries()) {
    <section>
      <Tabs index={this.state.index} onChange={setIndex}>
        <Tab label={i} onActive={this.setActive}>
          <small>Primary content</small>
          {child}
        </Tab>
      </Tabs>
    </section>;
  }

  return ret;
};

export default Tabs;
