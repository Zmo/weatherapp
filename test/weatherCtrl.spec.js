describe("weatherCtrl", function() {
    
    beforeEach(module("weatherApp"));

    var $controller;
    
    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_;
    }));

    describe("saveCity", function() {
        it("adds the provided city to saved cities", function() {
            var controller = $controller("weatherCtrl", {});
            controller.saveCity({display_location: {full: "test name"}});
            expect(controller.savedCities.length).toBe(1);
        });

        it("sorts the saved cities based on displayName", function() {
            var controller = $controller("weatherCtrl", {});
            controller.saveCity({display_location: {full: "test name2"}});
            controller.saveCity({display_location: {full: "test name1"}});
            expect(controller.savedCities[0].displayName).toBe("test name1");
            expect(controller.savedCities[1].displayName).toBe("test name2");
        });
    });
});
