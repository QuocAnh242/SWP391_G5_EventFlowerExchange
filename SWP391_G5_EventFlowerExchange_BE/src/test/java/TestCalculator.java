import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestCalculator {
    @ParameterizedTest
    @CsvFileSource(resources = "/cal.csv", numLinesToSkip = 1)
    void test(int a, int b, int add ) {
        Calculator calc = new Calculator();
        assertEquals(calc.add(a, b), add );
    }
    @ParameterizedTest
    @CsvFileSource(resources = "/cal.csv", numLinesToSkip = 1)
    void test1(int a, int b, int add,double min ) {
        Calculator calc = new Calculator();
        assertEquals(calc.minus(a, b), min );
    }

    @ParameterizedTest
    @CsvFileSource(resources = "/cal.csv", numLinesToSkip = 1)
    void test3(int a, int b ,int add, double min, int mul ) {
        Calculator calc = new Calculator();
        assertEquals(calc.multiply(a, b), mul );
    }
    @ParameterizedTest
    @CsvFileSource(resources = "/cal.csv", numLinesToSkip = 1)
    void test4(int a, int b,int add,double min, int mul, double div ) {
        Calculator calc = new Calculator();
        assertEquals(calc.divide(a, b), div);
    }
}
