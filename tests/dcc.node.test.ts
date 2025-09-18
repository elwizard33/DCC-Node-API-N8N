import { Dcc } from '../nodes/Dcc/Dcc.node';

describe('Dcc node description', () => {
  it('should expose expected basic metadata', () => {
    const node = new Dcc();
    const desc: any = (node as any).description;
    expect(desc.name).toBe('dcc');
    expect(desc.displayName).toMatch(/DecentralChain/i);
    expect(desc.icon).toContain('dcc.svg');
    // Ensure resources present
    const resourceProperty = desc.properties.find((p: any) => p.name === 'resource');
    expect(resourceProperty).toBeDefined();
    const resourceValues = resourceProperty.options.map((o: any) => o.value).sort();
  expect(resourceValues).toEqual(['account','matcher','token','transaction','utility'].sort());
    // Ensure at least one operation for each resource
    const getOps = (resource: string) => desc.properties.filter((p: any) => p.name === 'operation' && p.displayOptions?.show?.resource?.includes(resource));
    ['account','matcher','token','transaction','utility'].forEach(r => {
      const ops = getOps(r);
      expect(ops.length).toBeGreaterThan(0);
    });
  });
});
