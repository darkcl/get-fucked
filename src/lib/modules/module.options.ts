export type ModuleOption = {
  controllers?: NewableFunction[];
  imports?: NewableFunction[];
  exports?: NewableFunction[];
  provides?: NewableFunction[];
};
