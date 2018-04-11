package com.demisstif.btcbackend;

import com.demisstif.btcbackend.dao.ISearchDaoImpl;
import com.demisstif.btcbackend.model.HotDegree;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ISearchDaoImplTests {
    @Autowired
    private ISearchDaoImpl dao;

    @Before
    public void setting(){
       dao = new ISearchDaoImpl();
    }

    @Test
    public void dayTransactionNumber(){
//        HotDegree hotDegree = dao.dayTransactionNumber(2018, 4, 1);
//        Assert.assertEquals(3060, hotDegree.getTxNumberOneDay());
    }
}
