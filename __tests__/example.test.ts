describe('Example test', () => {
    it('should 2 plus 2 to be 4', () => {
        const sum  = (a: number, b:number): number => a+b
        const a = 2
        const b = 2
        const c = sum(a,b)

        expect(c).toBe(a+b)
    });
});