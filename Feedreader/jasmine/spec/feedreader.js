$(function() {
    describe('RSS Feeds', function() {

        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('url defined and not empty',function(){
            allFeeds.forEach(function(feed) {
                //check objects url key value pair exist 
               expect(feed.url).toBeDefined();
               expect(feed.url.length).not.toBe(0);
            })
        });
         it('name defined and not empty',function(){
             allFeeds.forEach(function(feed) {
                //check objects name key value pair exist 
               expect(feed.name).toBeDefined();
               expect(feed.name.length).not.toBe(0);;
            })
        });
    });

    describe('The Menu',function(){
        it('element is hidden by default',function(){
            //check body class list if menu-hidden exist case ok.
            expect($('body').hasClass("menu-hidden")).toBe(true); 
        }); 
        it('changes visibility when the menu icon clicked',function(){
            var button = $('a.menu-icon-link').eq(0);
            //trigger button click if menu-hidden does not exist in class list then everything ok.
            button.click();
            expect($('body').hasClass("menu-hidden")).not.toBe(true); 
            //contrast case
            button.click();
            expect($('body').hasClass("menu-hidden")).toBe(true); 
        });

    });

    describe('Initial Entries',function(){
        beforeEach(function(done){
            loadFeed(0,done);
        });
        it('should exist at least one entry',function(done){
            //check after loadfeed done entry content filled
            expect($('.feed .entry').length).not.toBe(0); 
            done();
        }); 
    }); 
    describe('New Feed Selection',function(){
        var current;
        beforeEach(function(done){
            loadFeed(0,function(){
                current = $('.entry').html();
                loadFeed(1,done);
            })
        });
        it('should loaded by the loadFeed function that changes content',function(done){
               var latest = $('.entry').html();
               //ensure loadfeed change content. compare before and after contents if they are not equeal than case ok.
               expect(current).not.toBe(latest);
               done();
        }); 
    });     
}());
