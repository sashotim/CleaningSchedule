Weekend.find({}, function(err, dates) {
    if (err) {
        console.log(err);
    }
    else {
        for (var i = 0; i < dates.length; i++) {
            var begin = moment('11 24 2017').add(i, 'week').calendar();
            var end = moment('11 27 2017').add(i, 'week').calendar();
            Weekend.create({
                    begin: begin,
                    end: end,
                    weekOfMonth: ((3 + i) % 4)
                },
                function(err, weekend) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("NEWLY CREATED WEEKEND: ");
                        console.log(weekend);
                    }
                });
            console.log(i);
        }
    }
})