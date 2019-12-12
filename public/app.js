
var app = new Vue({
  el: '#app',
  data: {
    grades: [],
    countGrades: null,
    average: null,
    median: null,
    high: null,
    low: null,
    isHide: false,
    isShow: true,
    errors: []
  },
  methods: {
    setLimit: function () {
        if(this.countGrades > 0)
        {
          this.isHide = true;
          this.isShow = false;
        
          var i;
          for(i = 0; i < this.countGrades; i++)
          {
              this.grades.push({ value: null, invalid: false });
          }
        }else{
          alert("Make sure to have a number higer than 0");
        }
    },
    CalcAll: function () {
      this.reset()
      this.check();
      if(this.errors.length == 0){
        this.CalcAvg();
        this.calcHighLow();
        this.calcMiddle();
      }
    },
    reset: function(){
      this.average = null;
      this.high = null;
      this.low = null;
    },
    check: function(){
      this.errors = [];
      let x;
      for(x = 0; x < this.countGrades; x++){
        if(typeof this.grades[x].value != 'number' || this.grades[x].value <= 0 || this.grades[x].value > 100){
          this.grades[x].invalid = true;
          this.errors.push('Grade #' + (x + 1) + ' is not a valid number.');
        }else{
          this.grades[x].invalid = false;
        }
      }
    },
    CalcAvg: function () {
      if(this.grades.length != 0){
        let i;
        for(i = 0; i < this.grades.length; i++)
        {
          this.average += parseFloat(this.grades[i].value)
        }
        this.average /= this.grades.length;
      }
    },
    calcHighLow: function() {
        this.high = this.grades[0].value;
        this.low = this.grades[0].value;

        let j;
        for(j=0; j < this.grades.length; j++)
        {
          if(this.grades[j].value > this.high){
            this.high = this.grades[j].value;
          }
          if(this.grades[j].value < this.low){
            this.low = this.grades[j].value;
          }
        }
        
    },
    calcMiddle: function() {
      // Bubble sort
      var a = [...this.grades];
      var t;


      for (p = 0; p <= a.length - 2; p++)
      {
        for (i = 0; i <= a.length - 2; i++)
        {
          if (a[i].value > a[i + 1].value)
          {
            t = a[i + 1];
            a[i + 1] = a[i];
            a[i] = t;
          }
        }
      }

      var l = a.length
      
      if (l % 2 === 0) {
        // average of two middle numbers
        //this.median = (a[l / 2 - 1].value + a[l / 2].value) / 2;
        this.median = (a[l / 2 - 1].value);
      } else { // is odd
        // middle number only
        this.median = a[(l - 1) / 2].value;
      }


    }
  }
});